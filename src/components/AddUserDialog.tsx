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

// Form data interface
interface FormData {
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  phone_number: string;
  address: string;
  role: string;
  status: string;
}

// Initial form state
const initialFormData: FormData = {
  username: '',
  email: '',
  password_hash: '',
  full_name: '',
  phone_number: '',
  role: 'user', // Default role
  status: 'active' // Default status
};

export function AddUserDialog({ dialogTrigger }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      setFormData(initialFormData); // Reset form data
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
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Full Name"
            type="text"
            name="full_name"
            value={formData.full_name}
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
            placeholder="Password"
            name="password_hash"
            type="password"
            value={formData.password_hash}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="p-2 bg-black text-white border rounded-sm"
          >
            <option value="customer">Customer</option>
            <option value="service_manager">Service Manager</option>
            <option value="stock_manager">Stock Manager</option>
            <option value="finance_controller">Finance Controller</option>
            <option value="supervisor">Supervisor</option>
            <option value="technician">Technician</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
            className="p-2 bg-black text-white border rounded-sm"
          >
            <option value="active">Active</option>
            <option value="pending">pending</option>
          </select>
          <Button type="submit">Register</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
