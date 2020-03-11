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
    public lastUpdatedBy?: string
  ) {}
}
