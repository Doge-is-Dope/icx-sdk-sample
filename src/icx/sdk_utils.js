import IconService, {
  IconConverter,
  HttpProvider,
  IconBuilder,
} from "icon-sdk-js";
import MockData from "./mock";

const provider = new HttpProvider(MockData.NODE_URL);

// Create IconService instance
const iconService = new IconService(provider);

export const getDefaultStepCost = async () => {
  const { CallBuilder } = IconBuilder;

  // Get governance score api list
  const governanceApi = await iconService
    .getScoreApi(MockData.GOVERNANCE_ADDRESS)
    .execute();
  console.log(governanceApi);
  const methodName = "getStepCosts";
  // Check input and output parameters of api if you need
  const getStepCostsApi = governanceApi.getMethod(methodName);
  const getStepCostsApiInputs =
    getStepCostsApi.inputs.length > 0
      ? JSON.stringify(getStepCostsApi.inputs)
      : "none";
  const getStepCostsApiOutputs =
    getStepCostsApi.outputs.length > 0
      ? JSON.stringify(getStepCostsApi.outputs)
      : "none";
  console.log(
    `[getStepCosts]\n inputs: ${getStepCostsApiInputs} \n outputs: ${getStepCostsApiOutputs}`
  );

  // Get step costs by iconService.call
  const callBuilder = new CallBuilder();
  const call = callBuilder
    .to(MockData.GOVERNANCE_ADDRESS)
    .method(methodName)
    .build();
  const stepCosts = await iconService.call(call).execute();
  return stepCosts.default;
};

export const getMaxStepLimit = async () => {
  const { CallBuilder } = IconBuilder;

  const governanceApi = await iconService
    .getScoreApi(MockData.GOVERNANCE_ADDRESS)
    .execute();
  // "getMaxStepLimit" : the maximum step limit value that any SCORE execution should be bounded by.
  const methodName = "getMaxStepLimit";
  // Check input and output parameters of api if you need
  const getMaxStepLimitApi = governanceApi.getMethod(methodName);

  const params = {};
  params[getMaxStepLimitApi.inputs[0].name] = "invoke";

  // Get max step limit by iconService.call
  const callBuilder = new CallBuilder();
  const call = callBuilder
    .to(MockData.GOVERNANCE_ADDRESS)
    .method(methodName)
    .params(params)
    .build();
  const maxStepLimit = await iconService.call(call).execute();
  return IconConverter.toBigNumber(maxStepLimit);
};

export const getStepPrice = async () => {
  const { CallBuilder } = IconBuilder;

  const methodName = "getStepPrice";

  const callBuilder = new CallBuilder();
  const call = callBuilder
    .to(MockData.GOVERNANCE_ADDRESS)
    .method(methodName)
    .build();
  const stepPrice = await iconService.call(call).execute();
  return IconConverter.toBigNumber(stepPrice);
};
