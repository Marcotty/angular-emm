export enum DisplayStateValues{
  DISPLAY_STATE_UNSPECIFIED = "UNSPECIFIED",
  ON = "ON",
  OFF = "OFF",
  DOZE = "DOZE",
  SUSPENDED = "SUSPENDED",
}
export enum DeviceState{
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}
export class Device {
  constructor(
    public name: string,
    public policyName: string,
    public userName: string,
    public hardwareInfo: {
      brand: string;
      model: string;
      serialNumber: string;
    },
    public softwareInfo: {
      androidVersion: string;
      primaryLanguageCode: string;
    },
    public networkInfo: {
      imei: string;
      wifiMacAddress: string;
    },
    public displays:
    {
      height: string;
      width: string;
      state: StateValues;
    },
    public updatedAt?: Date,
    public enrollmentTime?: Date,
    public lastUpdatedBy?: string
  ) {}
}
