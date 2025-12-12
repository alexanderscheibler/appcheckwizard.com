import { z } from "zod"

// Validation schema using Zod
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(1024),
  _gotcha: z.string().max(0, "Spam detected"),
});

export default ContactFormSchema;