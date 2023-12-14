import unittest  
from your_module import your_function  
  
class YourTestCase(unittest.TestCase):  
    def test_your_function(self):  
        self.assertEqual(your_function(input), expected_output)  
  
if __name__ == '__main__':  
    unittest.main()  