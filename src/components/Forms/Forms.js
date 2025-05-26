export const formTenantsInitialState = {
  id: "",
  name: "",
  document: "",
  replicate_services: false,
  replicate_products: false,
  replicate_payments: false,
  shop_dc_id: "",
  userlimit: "",
  module_customer: false,
  module_admin: false,
  module_service: false,
  module_product: false,
  module_stock: false,
  module_finance: false,
  module_fiscal: false,
  module_cashier: false,
  module_staff: false,
  module_agenda: "",
  contatoTelOne: "",
  contatoTelTwo: "",
  contatoCelOne: "",
  contatoCelTwo: "",
  email: "",
  password: "",
  nomeFantasia: "",
};

export const formNiveisInitialState = {
  id: "",
  name: "",
  canCreateRole: "",
  tenant_id: "",
  canCreateUser: "", //
  canEditRole: "",
  canDeleteRole: "",
  canEditUser: "", //
  canDeleteUser: "", //
  canCreateShop: "",
  canEditShop: "",
  canDeleteShop: "",
  canViewAudit: "",
  canCreateCustomer: "",
  canEditCustomer: "",
  canDeleteCustomer: "",
  canCreateStaff: "",
  canEditStaff: "",
  canDeleteStaff: "",
  canViewRole: "",
  canViewUser: "",
  canViewShop: "",
  canViewStaff: "",
  canViewService: "", //
  canCreateService: "", //
  canEditService: "", //
  canDeleteService: "",
  canViewComanda: "", //
  canCreateComanda: "", //
  canEditComanda: "", //
  canDeleteComanda: "", //
  canViewCustomer: "",
  canCreateProduct: "", //
  canViewProduct: "", //
  canEditProduct: "", //
  canDeleteProduct: "", //
  canCreateCashier: "", //
  canCloseCashier: "", //
  canReverseCashier: "", //
  canCancelComanda: "",
  canReverseComanda: "",
  canCreateServiceComanda: "",
  canEditServiceComanda: "",
  canDeleteServiceComanda: "",
  canViewServiceComanda: "",
  canViewProductComanda: "",
  canEditProductComanda: "",
  canCreateProductComanda: "",
  canDeleteProductComanda: "",
  canUnifyCustomer: "",
  canDiscountProductComanda: "",
  canDiscountServiceComanda: "",
  serviceComandaDiscoutLimit: "",
  productComandaDiscoutLimit: "",
  canViewBooking: "",
  canEditBooking: "",
  canDeleteBooking: "",
  canCreateBooking: "",
  canViewPackage: "", //
  canEditPackage: "", //
  canCreatePackage: "", //
  canDeletePackage: "", //
  canViewFinancial: "",
  canCreateFinancial: "",
  canEditFinancial: "",
  canDeleteFinancial: "",
  canBlockAgenda: "",
  discountProduct: "",
  canEditComandaValue: "",
  canCreateInventory: "",
  canShowInventory: "",
  canEditInventory: "",
  canDeleteInventory: "",
  canShowRequest: "",
  canCreateRequest: "",
  canEditRequest: "",
  canDeleteRequest: "",
  canShowEntry: "",
  canCreateEntry: "",
  canEditEntry: "",
  canDeleteEntry: "",
  canViewCampaign: "",
  canEditCampaign: "",
  canCreateCampaign: "",
  canDeleteCampaign: "",
  discountServices: "",
  canShowComission: "",
  canCreateComission: "",
  canEditComission: "",
  canDeleteComission: "",
  canShowComandaService: "",
  canCreateComandaService: "",
  canEditComandaService: "",
  canDeleteComandaService: "",
  showAllAgendas: "",
};
export const formUnitsInitialState = {
  id: "", // id (calculado pela api)
  tenant_id: "", // id da empresa
  name: "", // nome da unidade
  city: "",
  address_name: "",
  address_nunmber: "",
  zip_code: "",
  neighborhood: "",
  state: "",
};

export const formUsersInitialState = {
  active: "",
  email: "",
  first_name: "",
  id: "",
  pin: "",
  role_id: "",
  tenant_id: "",
};
