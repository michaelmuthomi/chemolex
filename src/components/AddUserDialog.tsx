import { Copy } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/backend/client";
import { toast, useToast } from "@/hooks/use-toast";

export function AddUserDialog({ dialogTrigger }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password_hash: "",
    role: "",
    date_created: new Date().toISOString().split("T")[0], // Default to today's date
    status: "active", // Default status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Logic to handle user registration
    const { data, error } = await supabase.from("users").insert([formData]);
    if (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "User registration failed.",
      });
    } else {
      toast({
        title: "Success",
        description: "User registered successfully.",
      });
      // setIsDialogOpen(false);
      setFormData({
        // Reset form data
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password_hash: "",
        role: "",
        date_created: new Date().toISOString().split("T")[0],
        status: "active",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Registration</DialogTitle>
          <DialogDescription>Add users to the database</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRegisterUser} className="grid gap-2">
          <Input
            placeholder="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Password"
            name="password_hash"
            type="password"
            value={formData.password_hash}
            onChange={handleInputChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="p-2 bg-black text-white border rounded-sm"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Customer">Customer</option>
            <option value="Dispatch Manager">Dispatch Manager</option>
            <option value="Finance Manager">Finance Manager</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
            className="p-2 bg-black text-white border rounded-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button type="submit">Register</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
