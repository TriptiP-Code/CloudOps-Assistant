const {
  EC2Client,
  DescribeInstancesCommand,
} = require("@aws-sdk/client-ec2");

const scanEC2Instances = async (
  accessKey,
  secretKey,
  region
) => {
  const client = new EC2Client({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const command =
    new DescribeInstancesCommand({});

  const response =
    await client.send(command);

  const instances = [];

  response.Reservations?.forEach(
    (reservation) => {
      reservation.Instances?.forEach(
        (instance) => {
          instances.push({
            instanceId:
              instance.InstanceId,

            instanceType:
              instance.InstanceType,

            state:
              instance.State?.Name,

            launchTime:
              instance.LaunchTime,
          });
        }
      );
    }
  );

  return instances;
};

module.exports = {
  scanEC2Instances,
};