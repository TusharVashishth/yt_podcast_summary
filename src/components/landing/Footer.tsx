import React from "react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto text-center">
        <p className="mb-4">© 2024 PodBite. All rights reserved.</p>
        <div className="flex justify-center space-x-4 ">
          <Button variant="link" className="text-white">
            Privacy Policy
          </Button>
          <Button variant="link" className="text-white">
            Terms of Service
          </Button>
          <Button variant="link" className="text-white">
            Contact
          </Button>
        </div>
      </div>
    </footer>
  );
}
