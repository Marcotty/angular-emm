export class Enterprise {
  constructor(
    public name: string,
    public enabledNotificationTypes: string,
    public pubsubTopic: string,
    public primaryColor: number,
    public logo: ImageData,
    public enterpriseDisplayName: string,
    public appAutoApprovalEnabled: string,
    public termsAndConditions: {
      UserFacingMessage:
      {
        localizedMessages: Map<string, string>,
        defaultMessage: string,
      }
    },
    public signinDetails: {
      signinUrl: string;
      siginEnrollmentToken: string;
      qrCode: string;
    },
    public updatedAt?: Date,
    public enrollmentTime?: Date,
    public lastUpdatedBy?: string
  ) {}
}