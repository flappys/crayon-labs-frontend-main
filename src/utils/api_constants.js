const BASEURL = "http://13.233.91.138:3000";

export const REGISTER_ROUTE = BASEURL + "/users/signup";
export const LOGIN_ROUTE = BASEURL + "/users/signin";
export const GET_PROJECTS_ROUTE = BASEURL + "/get_projects";
export const ADD_PROJECTS_ROUTE = BASEURL + "/create_project";
export const ADD_SUPPORT_ROUTE = BASEURL + "/create_support";
export const GET_PROJECT_ROUTE = BASEURL + "/get_project";
export const DELETE_PROJECT_ROUTE = BASEURL + "/delete_project";
export const UPDATE_PROJECT_ROUTE = BASEURL + "/update_project";
export const ADD_WHITE_LISTS_ROUTE = BASEURL + "/create_whitelist";
export const UPDATE_WHITE_LISTS_ROUTE = BASEURL + "/update_whitelist";
export const DELETE_WHITELIST_ROUTE = BASEURL + "/remove_whitelist";

export const UPDATE_WHITE_LISTS_ROUTE_TEST = BASEURL + "/update_whitelist_test";
export const ADD_WHITE_LISTS_ROUTE_TEST = BASEURL + "/create_whitelist_test";
export const ADD_BULK_UPLOAD = BASEURL + "/bulk_upload";

export const ADD_UPLOAD_LAYER = BASEURL + "/create_layer";
export const DELETE_LAYER = BASEURL + "/delete_layer";
export const GET_ALL_LAYERS = BASEURL + "/get_all_layers";

export const GET_ALL_LAYERS_IMAGES = BASEURL + "/get_layer_images";

export const ADD_LAYER_IMAGES = BASEURL + "/upload_layer_image";

export const DELETE_LAYER_IMAGE = BASEURL + "/delete_layer_image";

export const UPDATE_RULE_IMAGE = BASEURL + "/update_layer_image_rules";

export const UPDATE_RARITY = BASEURL + "/update_layer_image_rarity";

export const UPDATE_LAYER_NAME = BASEURL + "/update_layer_name";

export const UPDATE_LAYER_ORDER = BASEURL + "/update_layers_order";

export const CUSTOM_NFT = BASEURL + "/custom_nft";

export const UPDATE_ALL_RARITY = BASEURL + "/update_layer_images_rarity";

export const UPDATE_IMAGE_RARITY = BASEURL + "/update_layer_image_rarity";

export const UPDATE_LAYER_BLANK = BASEURL + "/update_layer_blank";

export const GET_PROJECT_DATA = BASEURL + "/get_project_data";

export const GEN_NFT = "https://hashlips.crayonlabs.art/generate_nft";

export const UPLOAD_NFT_TO_S3 = BASEURL + "/upload_build_folder/";

export const DOWNLOAD_NFT_BUILD = BASEURL + "/download_build_folder/";

export const GET_USER = BASEURL + "/get_user";
export const REGISTER_PAYLOAD = {
  name: "test",
  email: "",
  password: "",
};

export const GET_PROJECT_PAYLOAD = {
  user_id: "",
};

export const SET_PROJECT_PAYLOAD = {
  blockchain: "",
  project_name: "",
  external_url: "",
  project_desc: "",
  symbol: "",
  total_supply: "",
  mint_price: "",
  max_mint_limit: "",
  launch_date: "",
  mint_fund_addr1: "",
  mint_fund_addr2: "",
  mint_fund_addr3: "",
  mint_fund_addr4: "",
  mint_fund_addr1_perc: "",
  mint_fund_addr2_perc: "",
  mint_fund_addr3_perc: "",
  mint_fund_addr4_perc: "",
  presale_discount_price: "",
  presale_launch_date: "",
  presale_max_mint_limit: "",
  royalty_percentage: "",
  royalty_addr1: "",
  royalty_addr2: "",
  royalty_addr3: "",
  royalty_addr4: "",
  royalty_addr1_perc: "",
  royalty_addr2_perc: "",
  royalty_addr3_perc: "",
  royalty_addr4_perc: "",
  project_status: "",
  user_id: "",
};

export const PREVIEW_IMAGE = {};

export const SET_SUPPORT_PAYLOAD = {
  project_id: "",
  email_id: "",
  discord_id: "",
  message: "",
};

export const GET_PROJECT_PAYLOADS = {
  project_id: "",
};
