import { Config } from "./payload-types";

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}
