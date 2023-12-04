
declare function inject(token: InjectionToken<"pos">): (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => any;
export default inject;