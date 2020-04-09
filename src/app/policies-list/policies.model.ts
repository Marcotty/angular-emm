export enum installTypeValues
{
  KIOSK = "KIOSK",
  PREINSTALLED = "PREINSTALLED",
  FORCE_INSTALLED = "FORCE_INSTALLED",
  BLOCKED = "BLOCKED",
  AVAILABLE = "AVAILABLE",
  REQUIRED_FOR_SETUP = "REQUIRED_FOR_SETUP",
  INSTALL_TYPE_UNSPECIFIED = "INSTALL_TYPE_UNSPECIFIED",
}
export enum boolDisabled
{
  true = "Désactivé",
  false = "Activé",
}
export enum appAutoUpdateValues
{
  APP_AUTO_UDPATE_POLICY_UNSPECIFIED = "APP_AUTO_UDPATE_POLICY_UNSPECIFIED",
  CHOICE_TO_THE_USER = "CHOICE_TO_THE_USER",
  NEVER = "NEVER",
  WIFI_ONLY = "WIFI_ONLY",
  ALWAYS = "ALWAYS",
}
export enum defaultPermissionValues
{
  PROMPT = "PROMPT",
  GRANT = "GRANT",
  DENY = "DENY",
  PERMISSION_POLICY_UNSPECIFIED = "PERMISSION_POLICY_UNSPECIFIED"
}
export enum keyguardFeature
{
  CAMERA = "CAMERA",
  NOTIFS = "NOTIFICATIONS",
  UNREADNORIFS = "UNREDACTED_NOTIFICATIONS",
  TRUS = "TRUST_AGENTS",
  PRINT = "DISABLE_FINGERPRINT",
  FACE = "FACE",
  IRIS = "IRIS",
  ALL = "ALL_FEATURES"
}
export enum locationMode
{
  LOCATION_MODE_UNSPECIFIED = "LOCATION_MODE_UNSPECIFIED",
  HIGH_ACCURACY = "HIGH_ACCURACY",
  SENCORS_ONLY = "SENSORS_ONLY",
  BATTERY_SAVING = "BATTERY_SAVING",
  OFF = "OFF"
}
export enum encryptionPolicy
{
  ENCRYPTION_POLICY_UNSPECIFIED = "ENCRYPTION_POLICY_UNSPECIFIED",
  ENABLED_WITHOUT_PASSWORD = "ENABLED_WITHOUT_PASSWORD",
  ENABLED_WITH_PASSWORD = "ENABLED_WITH_PASSWORD"
}
export enum playStoreMode
{
  UNSPECIFIED = "PLAY_STORE_MODE_UNSPECIFIED",
  WITHELIST = "WHITELIST",
  BLACKLIST = "BLACKLIST"
}
export class Policy {
  constructor(
    public name: string,
    public version : string,
    public userName: string,
    public appAutoUpdatePolicy: string,
    public bluetoothDisabled : boolean,
    public applications: {
      packageName: string;
      installType: string;
      defaultPermissionPolicy: string;
    },
    public systemUpdate: {
      type: string;
    },
    public networkInfo: {
      imei: string;
      wifiMacAddress: string;
    },
    public kioskCustomization :
    {
      powerButtonActions: string;
      systemNavigation: string;
      statusBar: string;
      deviceSettings: string;
    },
    public updatedAt?: Date,
    public enrollmentTime?: Date,
    public lastUpdatedBy?: string,
  ) {}
}
