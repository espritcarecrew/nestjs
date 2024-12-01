import { Role } from './schemas/role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dtos/role.dto';
export declare class RolesService {
    private RoleModel;
    constructor(RoleModel: Model<Role>);
    createRole(role: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, Role> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getRoleById(roleId: string): Promise<import("mongoose").Document<unknown, {}, Role> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
