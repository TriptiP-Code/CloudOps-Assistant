const {
  STSClient,
  GetCallerIdentityCommand,
} = require("@aws-sdk/client-sts");

const validateAWSCredentials = async (
  accessKey,
  secretKey,
  region
) => {
  try {
    const client = new STSClient({
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const command =
      new GetCallerIdentityCommand({});

    const response =
      await client.send(command);

    return {
      valid: true,
      accountId: response.Account,
      arn: response.Arn,
      userId: response.UserId,
    };
  } catch (error) {
    console.error(
      "AWS Validation Error:",
      error.message
    );

    return {
      valid: false,
      error: error.message,
    };
  }
};

module.exports = {
  validateAWSCredentials,
};