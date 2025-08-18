import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const users = await this.userService.getAllUsers();
    for (const i in users) {
        const existing = users[i].email == dto.email;
        if (existing) {
            throw new BadRequestException("El email ya está registrado");
        }
    }
    return this.userService.createUser(dto);
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    if (!users || users.length === 0) {
          throw new NotFoundException('No users found');
    }
    return this.userService.getAllUsers();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.getUserById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.deleteUser(+id);
  }
}
