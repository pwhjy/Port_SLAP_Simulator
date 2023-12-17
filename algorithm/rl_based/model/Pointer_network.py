import os
import sys
import torch
import torch.nn as nn
import torch.nn.functional as F
import logging
class EncoderRNN(nn.Module):
    """
    Encoder负责编码所有输入,包含static,dynamic,每个输入对应使用一个Encoder网络.
    """

    def __init__(self, embedding_dim, hidden_size, num_layers=1, batch_first=True, bidirectional=True,
                 rnn_model="LSTM"):
        super(EncoderRNN, self).__init__()
        self.batch_first = batch_first
        if rnn_model == "LSTM":
            self.rnn = nn.LSTM(input_size=embedding_dim, hidden_size=hidden_size, num_layers=num_layers,
                               batch_first=batch_first, bidirectional=bidirectional)
        elif rnn_model == "GRU":
            self.rnn = nn.GRU(input_size=embedding_dim, hidden_size=hidden_size, num_layers=num_layers,
                              batch_first=batch_first, bidirectional=bidirectional)

    def forward(self, embedded_inputs, input_lengths):
        # Pack padded batch of sequences for RNN module
        packed = nn.utils.rnn.pack_padded_sequence(embedded_inputs, input_lengths.to('cpu'),
                                                   batch_first=self.batch_first, enforce_sorted=False)
        # Forward pass through RNN
        outputs, hidden = self.rnn(packed)
        # Unpack padding
        outputs, _ = nn.utils.rnn.pad_packed_sequence(outputs, batch_first=self.batch_first)
        # Return output and final hidden state
        return outputs, hidden


class Attention(nn.Module):
    def __init__(self, hidden_size) -> None:
        super(Attention, self).__init__()
        self.hidden_size = hidden_size
        self.W1 = nn.Linear(hidden_size, hidden_size, bias=False)
        self.W2 = nn.Linear(hidden_size, hidden_size, bias=False)
        self.vt = nn.Linear(hidden_size, 1, bias=False)

    def forward(self, decoder_state, encoder_outputs, mask):
        """
        -----------------
        eq1: uij=vt*tanh(W1*ej+W2*di)
        eq2: p(Ci|C1,...,Ci-1,P)=softmax(ui)
        -----------------
        input:
        decoder_state:
        encoder_outputs:
        mask:
        -----------------
        output:

        """
        # (batch_size, max_seq_len, hidden_size)
        encoder_transform = self.W1(encoder_outputs)
        # (batch_size, 1, hidden_size)
        decoder_transform = self.W2(decoder_state).unsqueeze(1)
        # (batch_size, max_seq_len, 1) => (batch_size, max_seq_len)
        ui = self.vt(torch.tanh(encoder_transform + decoder_transform)).squeeze(-1)
        mask_score = ui.masked_fill(mask, -float("inf"))
        log_score = F.softmax(mask_score, dim=-1)

        return log_score


class PtrNetwork(nn.Module):
    def __init__(self, input_dim, embedding_dim, hidden_size, bidirectional=True, batch_first=True,
                 rnn_model="LSTM") -> None:
        super(PtrNetwork, self).__init__()

        # Embedding dimension
        self.embedding_dim = embedding_dim
        # (Decoder) hidden size
        self.hidden_size = hidden_size
        # Bidirectional Encoder
        self.bidirectional = bidirectional
        self.num_direction = 2 if bidirectional else 1
        self.num_layers = 1
        self.batch_first = batch_first
        self.rnn_model = rnn_model

        # We use an embedding layer for more complicate application usages later, e.g. word sequences.
        # TODO: use Transformer for SLAP
        self.embedding = nn.Linear(in_features=input_dim, out_features=embedding_dim, bias=False)
        self.encoder = EncoderRNN(embedding_dim=embedding_dim, hidden_size=hidden_size, num_layers=self.num_layers,
                                  bidirectional=bidirectional, batch_first=batch_first, rnn_model=self.rnn_model)
        if rnn_model == "LSTM":
            self.decoding_rnn = nn.LSTMCell(input_size=hidden_size, hidden_size=hidden_size)
        elif rnn_model == "GRU":
            self.decoding_rnn = nn.GRUCell(input_size=hidden_size, hidden_size=hidden_size)
        self.attention = Attention(hidden_size=hidden_size)
        # 初始化bias参数为0
        for m in self.modules():
            if isinstance(m, nn.Linear):
                if m.bias is not None:
                    torch.nn.init.zeros_(m.bias)

    def forward(self, input, input_length, mask=None):
        # batch_first:True input:(batch, max_seq_len, state_dim)
        if self.batch_first:
            batch_size = input.size(0)
        else:
            batch_size = input.size(1)

        # Embedding 全连接层 (batch, max_seq_len, state_dim -> embedding_dim)
        embedded = self.embedding(input)
        # encoder_output => (batch_size, max_seq_len, hidden_size) if batch_first else (max_seq_len, batch_size, hidden_size)
        # hidden_size is usually set same as embedding size
        # encoder_hidden => (num_layers * num_directions, batch_size, hidden_size) for each of h_n and c_n
        encoder_outputs, encoder_hidden = self.encoder(embedded, input_length)

        if self.bidirectional:
            encoder_outputs = encoder_outputs[:, :, :self.hidden_size] + encoder_outputs[:, :, self.hidden_size:]

        decoder_input = encoder_outputs.new_zeros(torch.Size((batch_size, self.hidden_size)))

        h_i = None
        if self.rnn_model == "LSTM":
            # 隐藏层向量 (num_layers * num_directions, batch_size, hidden_size) => (num_layers, num_directions, batch_size, hidden_size)
            encoder_h_n, encoder_c_n = encoder_hidden
            decoder_hidden = (torch.sum(encoder_h_n, dim=[0]), torch.sum(encoder_c_n, dim=[0]))
            # RNN层: h, c: (batch_size, hidden_size) 获取当前decoder state
            h_i, c_i = self.decoding_rnn(decoder_input, decoder_hidden)
            h_i = h_i + c_i
        elif self.rnn_model == "GRU":
            decoder_hidden = torch.sum(encoder_hidden, dim=[0])
            h_i = self.decoding_rnn(decoder_input, decoder_hidden)

        # attention层 Get a pointer distribution over the encoder outputs using attention
        # (batch_size, max_seq_len)
        log_pointer_score = self.attention(h_i, encoder_outputs, mask)

        # Get the indices of maximum pointer
        # argmax = torch.argmax(log_pointer_score, dim=1)

        return log_pointer_score
