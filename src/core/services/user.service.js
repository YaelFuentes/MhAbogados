import { db } from "../connection/databaseService";
import * as bcrypt from "bcryptjs"

class UserService {
  constructor(id, username, password, name, lastname, phone, address) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.address = address;
  }

  async getById(id) {
    try {
      const user = await db("users").where("id", id).first();
      return user;
    } catch (e) {
      console.error("Error fetching user by ID:", e);
      return null;
    }
  }

  async getAll() {
    try {
      const users = await db("users")
      return users
    } catch (e) {
      console.error("Error fetching all users:", e);
      return [];
    }
  }

  async create(newUserData) {
    try {
      const hashedPassword = await bcrypt.hash(newUserData.password, 60);
      const newDataInfo = {
        ...newUserData,
        password: hashedPassword,
      };
      /* const newUserId = await db("users").insert(newUserData)
      return newUserId; */
    } catch (e) {
      console.error('Error creating a new client:', e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db("users").where("id", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error updating user by IDs:", e);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      await db("users").whereIn("id", ids).del();
      return true;
    } catch (e) {
      console.error("Error deleting user by ID:", e);
      return false;
    }
  }
}

export default UserService;