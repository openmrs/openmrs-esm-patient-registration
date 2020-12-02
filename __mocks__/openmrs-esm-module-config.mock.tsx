export const defineConfigSchema = jest.fn();

export const validators = {
  isBoolean: jest.fn(),
  isString: jest.fn(),
  isUrlWithTemplateParameters: jest.fn(),
};

export enum Type {
  Array = 'Array',
  Boolean = 'Boolean',
  ConceptUuid = 'ConceptUuid',
  Number = 'Number',
  Object = 'Object',
  String = 'String',
  UUID = 'UUID',
}
