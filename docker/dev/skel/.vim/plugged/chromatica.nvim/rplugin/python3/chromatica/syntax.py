
from functools import partial

from chromatica import logger
from chromatica.util import load_external_module
from chromatica.profiler import Profiler

load_external_module(__file__, "")
from clang import cindex

log = logger.logging.getLogger("chromatica.syntax")
prof = Profiler(output_fn=log.debug)

HIGHLIGHT_FEATURE_LEVEL=0

def get_cursor(tu, filename, row, col):
    return cindex.Cursor.from_location(tu, \
        cindex.SourceLocation.from_position(tu, tu.get_file(filename), row, col))

def get_symbol(cursor):
    """docstring for get_symbol"""
    if cursor.kind == cindex.CursorKind.MACRO_DEFINITION:
        return cursor

    symbol = cursor.get_definition()
    if not symbol:
        symbol = cursor.referenced

    if not symbol:
        return None

    if symbol.kind == cindex.CursorKind.CONSTRUCTOR \
            or symbol.kind == cindex.CursorKind.DESTRUCTOR:
        symbol = symbol.semantic_parent

    return symbol

def get_symbol_from_loc(tu, filename, row, col):
    """docstring for get_symbol_from_loc"""
    cursor = get_cursor(tu, filename, row, col)

    if not cursor:
        return None
    tokens = cursor.get_tokens()
    for token in tokens:
        # if token.kind.value == 2 \
        #         and row == token.location.line \
        if row == token.location.line \
                and token.location.column <= col \
                and col < token.location.column + len(token.spelling):
            symbol = get_symbol(cursor)
            if symbol and symbol.spelling == token.spelling:
                return symbol
    return None

LITERAL_GROUP = {
    cindex.CursorKind.INTEGER_LITERAL: "Number",
    cindex.CursorKind.FLOATING_LITERAL: "Float",
    cindex.CursorKind.IMAGINARY_LITERAL: "Number",
    cindex.CursorKind.STRING_LITERAL: None,
    cindex.CursorKind.CHARACTER_LITERAL: "Character",
    cindex.CursorKind.OBJC_STRING_LITERAL: None,
    cindex.CursorKind.INCLUSION_DIRECTIVE: "chromaticaIncludedHeaderFile",
}

TYPE_GROUP = {
    cindex.TypeKind.INVALID: None,
    cindex.TypeKind.UNEXPOSED: "Variable",
    cindex.TypeKind.VOID: "Variable",
    cindex.TypeKind.BOOL: "Variable",
    cindex.TypeKind.CHAR_U: "Variable",
    cindex.TypeKind.UCHAR: "Variable",
    cindex.TypeKind.CHAR16: "Variable",
    cindex.TypeKind.CHAR32: "Variable",
    cindex.TypeKind.USHORT: "Variable",
    cindex.TypeKind.UINT: "Variable",
    cindex.TypeKind.ULONG: "Variable",
    cindex.TypeKind.ULONGLONG: "Variable",
    cindex.TypeKind.UINT128: "Variable",
    cindex.TypeKind.CHAR_S: "Variable",
    cindex.TypeKind.SCHAR: "Variable",
    cindex.TypeKind.WCHAR: "Variable",
    cindex.TypeKind.SHORT: "Variable",
    cindex.TypeKind.INT: "Variable",
    cindex.TypeKind.LONG: "Variable",
    cindex.TypeKind.LONGLONG: "Variable",
    cindex.TypeKind.INT128: "Variable",
    cindex.TypeKind.FLOAT: "Variable",
    cindex.TypeKind.DOUBLE: "Variable",
    cindex.TypeKind.LONGDOUBLE: "Variable",
    cindex.TypeKind.NULLPTR: "Variable",
    cindex.TypeKind.OVERLOAD: "Variable",
    cindex.TypeKind.DEPENDENT: "Variable",
    cindex.TypeKind.OBJCID: "Variable",
    cindex.TypeKind.OBJCCLASS: "Variable",
    cindex.TypeKind.OBJCSEL: "Variable",
    cindex.TypeKind.FLOAT128: "Variable",
    cindex.TypeKind.HALF: "Variable",
    cindex.TypeKind.COMPLEX: "Variable",
    cindex.TypeKind.POINTER: "Variable",
    cindex.TypeKind.BLOCKPOINTER: "Variable",
    cindex.TypeKind.LVALUEREFERENCE: "Variable",
    cindex.TypeKind.RVALUEREFERENCE: "Variable",
    cindex.TypeKind.RECORD: "Variable",
    cindex.TypeKind.ENUM: "EnumConstant",
    cindex.TypeKind.TYPEDEF: "Variable",
    cindex.TypeKind.OBJCINTERFACE: "Variable",
    cindex.TypeKind.OBJCOBJECTPOINTER: "Variable",
    cindex.TypeKind.FUNCTIONNOPROTO: "Function",
    cindex.TypeKind.FUNCTIONPROTO: "Function",
    cindex.TypeKind.CONSTANTARRAY: "Variable",
    cindex.TypeKind.VECTOR: "Variable",
    cindex.TypeKind.INCOMPLETEARRAY: "Variable",
    cindex.TypeKind.VARIABLEARRAY: "Variable",
    cindex.TypeKind.DEPENDENTSIZEDARRAY: "Variable",
    cindex.TypeKind.MEMBERPOINTER: "Member",
    cindex.TypeKind.AUTO: "Variable",
    cindex.TypeKind.ELABORATED: "Variable",
    cindex.TypeKind.PIPE: "Variable",
    cindex.TypeKind.OCLIMAGE1DRO: "Variable",
    cindex.TypeKind.OCLIMAGE1DARRAYRO: "Variable",
    cindex.TypeKind.OCLIMAGE1DBUFFERRO: "Variable",
    cindex.TypeKind.OCLIMAGE2DRO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYRO: "Variable",
    cindex.TypeKind.OCLIMAGE2DDEPTHRO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYDEPTHRO: "Variable",
    cindex.TypeKind.OCLIMAGE2DMSAARO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYMSAARO: "Variable",
    cindex.TypeKind.OCLIMAGE2DMSAADEPTHRO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYMSAADEPTHRO: "Variable",
    cindex.TypeKind.OCLIMAGE3DRO: "Variable",
    cindex.TypeKind.OCLIMAGE1DWO: "Variable",
    cindex.TypeKind.OCLIMAGE1DARRAYWO: "Variable",
    cindex.TypeKind.OCLIMAGE1DBUFFERWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DDEPTHWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYDEPTHWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DMSAAWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYMSAAWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DMSAADEPTHWO: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYMSAADEPTHWO: "Variable",
    cindex.TypeKind.OCLIMAGE3DWO: "Variable",
    cindex.TypeKind.OCLIMAGE1DRW: "Variable",
    cindex.TypeKind.OCLIMAGE1DARRAYRW: "Variable",
    cindex.TypeKind.OCLIMAGE1DBUFFERRW: "Variable",
    cindex.TypeKind.OCLIMAGE2DRW: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYRW: "Variable",
    cindex.TypeKind.OCLIMAGE2DDEPTHRW: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYDEPTHRW: "Variable",
    cindex.TypeKind.OCLIMAGE2DMSAARW: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYMSAARW: "Variable",
    cindex.TypeKind.OCLIMAGE2DMSAADEPTHRW: "Variable",
    cindex.TypeKind.OCLIMAGE2DARRAYMSAADEPTHRW: "Variable",
    cindex.TypeKind.OCLIMAGE3DRW: "Variable",
    cindex.TypeKind.OCLSAMPLER: "Variable",
    cindex.TypeKind.OCLEVENT: "Variable",
    cindex.TypeKind.OCLQUEUE: "Variable",
    cindex.TypeKind.OCLRESERVEID: "Variable",
}

SYNTAX_GROUP = {
# Declarations
    cindex.CursorKind.UNEXPOSED_DECL: None,
    cindex.CursorKind.STRUCT_DECL: "chromaticaStructDecl",
    cindex.CursorKind.UNION_DECL: "chromaticaUnionDecl",
    cindex.CursorKind.CLASS_DECL: "chromaticaClassDecl",
    cindex.CursorKind.ENUM_DECL: "chromaticaEnumDecl",
    cindex.CursorKind.FIELD_DECL: "chromaticaFieldDecl",
    cindex.CursorKind.ENUM_CONSTANT_DECL: "chromaticaEnumConstantDecl",
    cindex.CursorKind.FUNCTION_DECL: "chromaticaFunctionDecl",
    cindex.CursorKind.VAR_DECL: "chromaticaVarDecl",
    cindex.CursorKind.PARM_DECL: "chromaticaParmDecl",
    cindex.CursorKind.OBJC_INTERFACE_DECL: "chromaticaObjCInterfaceDecl",
    cindex.CursorKind.OBJC_CATEGORY_DECL: "chromaticaObjCCategoryDecl",
    cindex.CursorKind.OBJC_PROTOCOL_DECL: "chromaticaObjCProtocolDecl",
    cindex.CursorKind.OBJC_PROPERTY_DECL: "chromaticaObjCPropertyDecl",
    cindex.CursorKind.OBJC_IVAR_DECL: "chromaticaObjCIvarDecl",
    cindex.CursorKind.OBJC_INSTANCE_METHOD_DECL: "chromaticaObjCInstanceMethodDecl",
    cindex.CursorKind.OBJC_CLASS_METHOD_DECL: "chromaticaObjCClassMethodDecl",
    cindex.CursorKind.OBJC_IMPLEMENTATION_DECL: "chromaticaObjCImplementationDecl",
    cindex.CursorKind.OBJC_CATEGORY_IMPL_DECL: "chromaticaObjCCategoryImplDecl",
    cindex.CursorKind.TYPEDEF_DECL: "chromaticaTypedefDecl",
    cindex.CursorKind.CXX_METHOD: "chromaticaFunctionDecl",
    cindex.CursorKind.NAMESPACE: "chromaticaNamespace",
    cindex.CursorKind.LINKAGE_SPEC: "chromaticaLinkageSpec",
    cindex.CursorKind.CONSTRUCTOR: "chromaticaFunctionDecl",
    cindex.CursorKind.DESTRUCTOR: "chromaticaFunctionDecl",
    cindex.CursorKind.CONVERSION_FUNCTION: "chromaticaConversionFunction",
    cindex.CursorKind.TEMPLATE_TYPE_PARAMETER: "chromaticaTemplateTypeParameter",
    cindex.CursorKind.TEMPLATE_NON_TYPE_PARAMETER: "chromaticaTemplateNoneTypeParameter",
    cindex.CursorKind.TEMPLATE_TEMPLATE_PARAMETER: "chromaticaTemplateTemplateParameter",
    cindex.CursorKind.FUNCTION_TEMPLATE: "chromaticaFunctionDecl",
    cindex.CursorKind.CLASS_TEMPLATE: "chromaticaClassDecl",
    cindex.CursorKind.CLASS_TEMPLATE_PARTIAL_SPECIALIZATION: "chromaticaClassTemplatePartialSpecialization",
    cindex.CursorKind.NAMESPACE_ALIAS: "chromaticaNamespaceAlias",
    cindex.CursorKind.USING_DIRECTIVE: "chromaticaUsingDirective",
    cindex.CursorKind.USING_DECLARATION: "chromaticaUsingDeclaration",
    cindex.CursorKind.TYPE_ALIAS_DECL: "chromaticaTypeAliasDecl",
    cindex.CursorKind.OBJC_SYNTHESIZE_DECL: "chromaticaObjCSynthesizeDecl",
    cindex.CursorKind.OBJC_DYNAMIC_DECL: "chromaticaObjCDynamicDecl",
    cindex.CursorKind.CXX_ACCESS_SPEC_DECL: "chromaticaCXXAccessSpecifier",
# References
    cindex.CursorKind.OBJC_SUPER_CLASS_REF: "chromaticaObjCSuperClassRef",
    cindex.CursorKind.OBJC_PROTOCOL_REF: "chromaticaObjCProtocolRef",
    cindex.CursorKind.OBJC_CLASS_REF: "chromaticaObjCClassRef",
    cindex.CursorKind.TYPE_REF: "chromaticaTypeRef",  # class ref
    cindex.CursorKind.CXX_BASE_SPECIFIER: "chromaticaCXXBaseSpecifier",
    cindex.CursorKind.TEMPLATE_REF: "chromaticaTemplateRef",  # template class ref
    cindex.CursorKind.NAMESPACE_REF: "chromaticaNamespaceRef",  # namespace ref
    cindex.CursorKind.MEMBER_REF: "chromaticaDeclRefExprCall",  # ex: designated initializer
    cindex.CursorKind.LABEL_REF: "chromaticaLableRef",
    cindex.CursorKind.OVERLOADED_DECL_REF: "chromaticaOverloadDeclRef",
    cindex.CursorKind.VARIABLE_REF: "chromaticaVariableRef",
# Errors
    cindex.CursorKind.INVALID_FILE: None,
    cindex.CursorKind.NO_DECL_FOUND: None,
    cindex.CursorKind.NOT_IMPLEMENTED: None,
    cindex.CursorKind.INVALID_CODE: None,
# Expressions
    cindex.CursorKind.UNEXPOSED_EXPR: None,
    cindex.CursorKind.DECL_REF_EXPR: TYPE_GROUP,
    cindex.CursorKind.MEMBER_REF_EXPR:
    {
        cindex.TypeKind.UNEXPOSED: "chromaticaMemberRefExprCall",  # member function call
    },
    cindex.CursorKind.CALL_EXPR: "chromaticaCallExpr",
    cindex.CursorKind.OBJC_MESSAGE_EXPR: "chromaticaObjCMessageExpr",
    cindex.CursorKind.BLOCK_EXPR: "chromaticaBlockExpr",

    # literals moved
    cindex.CursorKind.PAREN_EXPR: None,
    cindex.CursorKind.UNARY_OPERATOR: "chromaticaStatement",
    cindex.CursorKind.ARRAY_SUBSCRIPT_EXPR: None,
    cindex.CursorKind.BINARY_OPERATOR: "chromaticaStatement",
    cindex.CursorKind.COMPOUND_ASSIGNMENT_OPERATOR: None,
    cindex.CursorKind.CONDITIONAL_OPERATOR: None,
    cindex.CursorKind.CSTYLE_CAST_EXPR: "chromaticaCStyleCast",
    cindex.CursorKind.COMPOUND_LITERAL_EXPR: None,
    cindex.CursorKind.INIT_LIST_EXPR: None,
    cindex.CursorKind.ADDR_LABEL_EXPR: None,
    cindex.CursorKind.StmtExpr: None,
    cindex.CursorKind.GENERIC_SELECTION_EXPR: None,
    cindex.CursorKind.GNU_NULL_EXPR: None,
    cindex.CursorKind.CXX_STATIC_CAST_EXPR: "chromaticaCXXCast",
    cindex.CursorKind.CXX_DYNAMIC_CAST_EXPR: "chromaticaCXXCast",
    cindex.CursorKind.CXX_REINTERPRET_CAST_EXPR: "chromaticaCXXCast",
    cindex.CursorKind.CXX_CONST_CAST_EXPR: "chromaticaCXXCast",
    cindex.CursorKind.CXX_FUNCTIONAL_CAST_EXPR: "chromaticaCXXCast",
    cindex.CursorKind.CXX_TYPEID_EXPR: "chromaticaStatement",
    cindex.CursorKind.CXX_BOOL_LITERAL_EXPR: "chromaticaBoolean",
    cindex.CursorKind.CXX_NULL_PTR_LITERAL_EXPR: "chromaticaConstant",
    cindex.CursorKind.CXX_THIS_EXPR: "chromaticaStatement",

    cindex.CursorKind.CXX_THROW_EXPR: "chromaticaExceptionStatement",
    cindex.CursorKind.CXX_NEW_EXPR: "chromaticaStatement",
    cindex.CursorKind.CXX_DELETE_EXPR: "chromaticaStatement",
    cindex.CursorKind.CXX_UNARY_EXPR: "chromaticaStatement",
    cindex.CursorKind.OBJC_ENCODE_EXPR: None,
    cindex.CursorKind.OBJC_SELECTOR_EXPR: None,
    cindex.CursorKind.OBJC_PROTOCOL_EXPR: None,
    cindex.CursorKind.OBJC_BRIDGE_CAST_EXPR: None,
    cindex.CursorKind.PACK_EXPANSION_EXPR: None,
    cindex.CursorKind.SIZE_OF_PACK_EXPR: None,
    cindex.CursorKind.LAMBDA_EXPR: None,
    cindex.CursorKind.OBJ_BOOL_LITERAL_EXPR: None,
    cindex.CursorKind.OBJ_SELF_EXPR: None,
    cindex.CursorKind.OMP_ARRAY_SECTION_EXPR: None,
    cindex.CursorKind.OMP_PARALLEL_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_FOR_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_SECTIONS_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_SECTION_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_SINGLE_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_PARALLEL_FOR_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_PARALLEL_SECTIONS_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TASK_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_MASTER_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_CRITICAL_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TASKYIELD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_BARRIER_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TASKWAIT_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_FLUSH_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_ORDERED_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_ATOMIC_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_FOR_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_PARALLELFORSIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TEAMS_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TASKGROUP_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_CANCELLATION_POINT_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_CANCEL_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_DATA_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TASK_LOOP_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TASK_LOOP_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_DISTRIBUTE_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_ENTER_DATA_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_EXIT_DATA_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_PARALLEL_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_PARALLELFOR_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_UPDATE_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_DISTRIBUTE_PARALLELFOR_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_DISTRIBUTE_PARALLEL_FOR_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_DISTRIBUTE_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_PARALLEL_FOR_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TARGET_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TEAMS_DISTRIBUTE_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TEAMS_DISTRIBUTE_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TEAMS_DISTRIBUTE_PARALLEL_FOR_SIMD_DIRECTIVE: "chromaticaOMPStatement",
    cindex.CursorKind.OMP_TEAMS_DISTRIBUTE_PARALLEL_FOR_DIRECTIVE: "chromaticaOMPStatement",

    cindex.CursorKind.UNEXPOSED_STMT: None,
    cindex.CursorKind.LABEL_STMT: "chromaticaStatement",
    cindex.CursorKind.COMPOUND_STMT: None,
    cindex.CursorKind.CASE_STMT: "chromaticaSwitch",
    cindex.CursorKind.DEFAULT_STMT: "chromaticaSwitch",
    cindex.CursorKind.IF_STMT: "chromaticaIf",
    cindex.CursorKind.SWITCH_STMT: "chromaticaSwitch",
    cindex.CursorKind.WHILE_STMT: "chromaticaLoop",
    cindex.CursorKind.DO_STMT: "chromaticaLoop",
    cindex.CursorKind.FOR_STMT: "chromaticaLoop",
    cindex.CursorKind.GOTO_STMT: "chromaticaStatement",
    cindex.CursorKind.INDIRECT_GOTO_STMT: "chromaticaStatement",
    cindex.CursorKind.CONTINUE_STMT: "chromaticaStatement",
    cindex.CursorKind.BREAK_STMT: "chromaticaStatement",
    cindex.CursorKind.RETURN_STMT: "chromaticaStatement",
    cindex.CursorKind.ASM_STMT: "chromaticaStatement",
    cindex.CursorKind.OBJC_AT_TRY_STMT: None,
    cindex.CursorKind.OBJC_AT_CATCH_STMT: None,
    cindex.CursorKind.OBJC_AT_FINALLY_STMT: None,
    cindex.CursorKind.OBJC_AT_THROW_STMT: None,
    cindex.CursorKind.OBJC_AT_SYNCHRONIZED_STMT: None,
    cindex.CursorKind.OBJC_AUTORELEASE_POOL_STMT: None,
    cindex.CursorKind.OBJC_FOR_COLLECTION_STMT: None,
    cindex.CursorKind.CXX_CATCH_STMT: "chromaticaExceptionStatement",
    cindex.CursorKind.CXX_TRY_STMT: "chromaticaExceptionStatement",
    cindex.CursorKind.CXX_FOR_RANGE_STMT: "chromaticaLoop",
    cindex.CursorKind.SEH_TRY_STMT: "chromaticaMSStatement",
    cindex.CursorKind.SEH_EXCEPT_STMT: "chromaticaMSStatement",
    cindex.CursorKind.SEH_FINALLY_STMT: "chromaticaMSStatement",
    cindex.CursorKind.SEH_LEAVE_STMT: "chromaticaMSStatement",
    cindex.CursorKind.MS_ASM_STMT: "chromaticaMSStatement",
    cindex.CursorKind.NULL_STMT: None,
    cindex.CursorKind.DECL_STMT: None,

    cindex.CursorKind.UNEXPOSED_ATTR: None,
    cindex.CursorKind.IB_ACTION_ATTR: None,
    cindex.CursorKind.IB_OUTLET_ATTR: None,
    cindex.CursorKind.IB_OUTLET_COLLECTION_ATTR: None,
    cindex.CursorKind.CXX_FINAL_ATTR: "chromaticaFinalAttr",
    cindex.CursorKind.CXX_OVERRIDE_ATTR: "chromaticaOverrideAttr",
    cindex.CursorKind.ANNOTATE_ATTR: None,
    cindex.CursorKind.ASM_LABEL_ATTR: None,
    cindex.CursorKind.PACKED_ATTR: None,
    cindex.CursorKind.PURE_ATTR: None,
    cindex.CursorKind.CONST_ATTR: "chromaticaConstAttr",
    cindex.CursorKind.NODUPLICATE_ATTR: None,
    cindex.CursorKind.CUDACONSTANT_ATTR: None,
    cindex.CursorKind.CUDADEVICE_ATTR: None,
    cindex.CursorKind.CUDAGLOBAL_ATTR: None,
    cindex.CursorKind.CUDAHOST_ATTR: None,
    cindex.CursorKind.CUDASHARED_ATTR: None,
    cindex.CursorKind.VISIBILITY_ATTR: None,
    cindex.CursorKind.DLLEXPORT_ATTR: None,
    cindex.CursorKind.DLLIMPORT_ATTR: None,

    cindex.CursorKind.PREPROCESSING_DIRECTIVE: None,
    cindex.CursorKind.MACRO_DEFINITION: "chromaticaMacroDefinition",
    cindex.CursorKind.MACRO_INSTANTIATION: "chromaticaMacroInstantiation",
    cindex.CursorKind.INCLUSION_DIRECTIVE: "chromaticaInclusionDirective",

    cindex.CursorKind.MODULE_IMPORT_DECL: "",
    cindex.CursorKind.TYPE_ALIAS_TEMPLATE_DECL: "",
    cindex.CursorKind.STATIC_ASSERT: "",
    cindex.CursorKind.FRIEND_DECL: "",

}

KEYWORDS = {
    "using": "chromaticaTypeAliasStatement",
    "typedef": "chromaticaTypedef",
    "static": "chromaticaLinkage",
    "extern": "chromaticaLinkage",
    "const": "chromaticaStorageClass",
    "mutable": "chromaticaStorageClass",
    "volatile": "chromaticaAccessQual",
    "restrict": "chromaticaAccessQual",
    "noexcept": "chromaticaExceptionAttr",
    "inline": "chromaticaSpecifier",
    "constexpr": "chromaticaSpecifier",
    "decltype": "chromaticaAutoType",
    "auto": "chromaticaAutoType",
    "register": "chromaticaRegister",
    "thread_local": "chromaticaThreadLocal",
    "operator": "chromaticaOperatorOverload",
    "static_cast": "chromaticaCXXCast",
    "const_cast": "chromaticaCXXCast",
    "dynamic_cast": "chromaticaCXXCast",
    "reinterpret_cast": "chromaticaCXXCast",
}

PUNCTUATION_SYNTAX_GROUP = {
    cindex.CursorKind.CONDITIONAL_OPERATOR: "chromaticaConditionalOperator",
    cindex.CursorKind.CSTYLE_CAST_EXPR: "chromaticaCStyleCast",
    cindex.CursorKind.INCLUSION_DIRECTIVE: "chromaticaIncludedHeaderFile",
}

def _get_default_syn(tu, token, cursor):
    if cursor.kind.is_preprocessing():
        return "chromaticaPrepro"
    elif cursor.kind.is_declaration():
        if not cursor.kind.UNEXPOSED_DECL: return "chromaticaDecl"
        else: return None
    elif cursor.kind.is_reference():
        return "chromaticaRef"
    else:
        return None

def _get_identifier_syn(tu, token, cursor):
    group = _get_default_syn(tu, token, cursor)

    _group = SYNTAX_GROUP.get(cursor.kind)
    if _group:
        if cursor.kind == cindex.CursorKind.DECL_REF_EXPR:
            _group = _group.get(cursor.type.kind)
            if _group:
                group = _group
        elif cursor.kind == cindex.CursorKind.MEMBER_REF_EXPR:
            _group = _group.get(cursor.type.kind)
            if _group:
                group = _group
            else:
                group = "chromaticaMemberRefExprVar"
        else:
            group = _group
    return group

def _get_keyword_decl_syn(tu, token, cursor):
    group = KEYWORDS.get(token.spelling)
    if group:
        return group
    else:
        if cursor.kind not in (cindex.CursorKind.UNEXPOSED_DECL, cindex.CursorKind.CXX_ACCESS_SPEC_DECL):
            return "chromaticaType"
        elif cursor.kind == cindex.CursorKind.UNEXPOSED_DECL:
            return None
        else:
            return SYNTAX_GROUP.get(cursor.kind)

def _get_keyword_syn(tu, token, cursor):
    """Handles cursor type of keyword tokens. Providing syntax group for most
    keywords"""
    if cursor.kind.is_declaration(): # hack for function return type and others
        return _get_keyword_decl_syn(tu, token, cursor)
    elif cursor.kind == cindex.CursorKind.COMPOUND_LITERAL_EXPR:
        return _get_keyword_decl_syn(tu, token, cursor)
    elif cursor.kind == cindex.CursorKind.INVALID_FILE and token.spelling == "typedef":
        return "chromaticaTypeRef"
    else:
        _group = SYNTAX_GROUP.get(cursor.kind)
        if _group:
            if cursor.kind == cindex.CursorKind.DECL_REF_EXPR:
                return "Type"
            elif cursor.kind == cindex.CursorKind.CALL_EXPR \
                    and cursor.type == cindex.TypeKind.UNEXPOSED:
                return "Type"
            else:
                return _get_identifier_syn(tu, token, cursor)

def _get_punctuation_syntax(tu, token, cursor):
    """Handles tokens for punctuation"""
    group = PUNCTUATION_SYNTAX_GROUP.get(cursor.kind)
    if group: return group
    else: return None

def _get_syntax_group(tu, token):
    cursor = token.cursor
    cursor._tu = tu

    if HIGHLIGHT_FEATURE_LEVEL >= 1:
        if token.kind.value == 0: # Punctuation
            return _get_punctuation_syntax(tu, token, cursor)
        elif token.kind.value == 1: # Keyword
            return _get_keyword_syn(tu, token, cursor)
        elif token.kind.value == 4: # Comment: let vim handle it
            return None

    if token.kind.value == 2: # Identifier
        return _get_identifier_syn(tu, token, cursor)

    elif token.kind.value == 3: # Literal
        literal_type = LITERAL_GROUP.get(cursor.kind)
        if literal_type: return literal_type
        else: return None
    else:
        return None

def _get_highlight_token(token, _tu):
    n_moreline = token.spelling.count("\n")
    if token.spelling[-1] == "\n":
        n_moreline = n_moreline - 1
    pos = [token.location.line, token.location.column, len(token.spelling), n_moreline]
    group = _get_syntax_group(_tu, token)
    return [group, pos]

def get_highlight(tu, filename, lbegin, lend):
    log.debug("get_highlight")
    file = tu.get_file(filename)

    if not file:
        return None, None

    begin = cindex.SourceLocation.from_position(tu, file, line=lbegin, column=1)
    end   = cindex.SourceLocation.from_position(tu, file, line=lend+1, column=1)
    tokens = tu.get_tokens(extent=cindex.SourceRange.from_locations(begin, end))

    get_highlight_token = partial(_get_highlight_token, _tu=tu)
    hl_tokens = map(get_highlight_token, tokens)
    return list(filter((lambda x: x[0] != None), hl_tokens))

def dump_ast_info(tu, filename, lbegin, lend):
    NOCOLOR = 0
    BLACK   = 30
    RED     = 31
    GREEN   = 32
    YELLOW  = 33
    BLUE    = 34
    MAGENTA = 35
    CYAN    = 36
    WHITE   = 37

    NORMAL    = 0
    BOLD      = 1
    INVERSE   = 3
    UNDERLINE = 4
    BLINK     = 5

    def termcolor(fgcolor=NOCOLOR, mode=NORMAL, bgcolor=NOCOLOR):
        if fgcolor == NOCOLOR:
            return "\033[0m"
        if bgcolor == NOCOLOR:
            return "\033[%d;%dm" % (mode, fgcolor)
        return "\033[%d;%d;%dm" % (mode, fgcolor, bgcolor+10)

    fp = open("AST_out.log", "w")
    file = tu.get_file(filename)

    if not file:
        return None

    begin = cindex.SourceLocation.from_position(tu, file, line=lbegin, column=1)
    end   = cindex.SourceLocation.from_position(tu, file, line=lend+1, column=1)
    tokens = tu.get_tokens(extent=cindex.SourceRange.from_locations(begin, end))

    syntax = {}
    output = {}

    for token in tokens:
        cursor = token.cursor
        cursor._tu = tu

        symbol = token.spelling
        pos = [token.location.line, token.location.column, len(token.spelling)]
        group = _get_syntax_group(tu, token)

        if token.kind.value != 0:
            fp.write(termcolor(GREEN) + "%s " % (symbol))
            if group:
                fp.write(termcolor(BLUE) + "%s " % (group))
            else:
                fp.write(termcolor(RED) + "%s " % (group))
            fp.write(termcolor() + "%s " % (pos))
            if cursor.kind.is_preprocessing():
                fp.write(termcolor(BLUE) + "PREPROC ")
            fp.write(termcolor(YELLOW) + "%s " % (str(token.kind).split(".")[1]))
            fp.write(termcolor(CYAN) + "%s " % (str(cursor.kind).split(".")[1]))
            # if cursor.type.kind != cindex.TypeKind.INVALID:
            fp.write(termcolor(MAGENTA) + "%s " % (str(cursor.type.kind).split(".")[1]))
            # if cursor.result_type.kind != cindex.TypeKind.INVALID:
            fp.write(termcolor(RED, BOLD) + "%s " % (str(cursor.result_type.kind).split(".")[1]))
            # if cursor.storage_class != cindex.StorageClass.INVALID:
            fp.write(termcolor(CYAN, BOLD) + "%s " % (str(cursor.storage_class).split(".")[1]))
            # if cursor.access_specifier != cindex.AccessSpecifier.INVALID:
            fp.write(termcolor(MAGENTA, BOLD) + "%s " % (str(cursor.access_specifier).split(".")[1]))
            fp.write(termcolor() + "\n")

    fp.close()

