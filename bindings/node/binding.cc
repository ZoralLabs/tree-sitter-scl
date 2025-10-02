#include <node_api.h>

typedef struct TSLanguage TSLanguage;

extern "C" TSLanguage *tree_sitter_scl();

// "tree-sitter", "language" hashed with BLAKE2
const napi_type_tag LANGUAGE_TYPE_TAG = {0xA281674CF2487A85,
                                         0x852C407CB62F561A};

static napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value language;

  status = napi_create_external(env, tree_sitter_scl(), NULL, NULL, &language);
  if (status != napi_ok) {
    napi_throw_error(env, "EINVAL", "Error creating external language");
    return NULL;
  }

  status = napi_type_tag_object(env, language, &LANGUAGE_TYPE_TAG);
  if (status != napi_ok) {
    napi_throw_error(env, "EINVAL", "Error tagging language object");
    return NULL;
  }

  return language;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
