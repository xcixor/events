"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Combobox from "@/components/ui/combobox";

type Props = {
  eventId: string;
};

const timeSlots = [
  {
    label: "Group A 10am - 1pm",
    value: "Morning",
  },
  {
    label: "Group B 2pm - 5pm",
    value: "Afternoon",
  },
];

const Registration = ({ eventId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    name: z.string().min(2, "Please provide your name"),
    phoneNumber: z.string().min(2, "Please provide your phone number"),
    email: z.string().email("Please provide a valid email address"),
    terms: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions",
    }),
    company: z.string().min(2, "Which company are you from?"),
    timeSlot: z.string().min(2, "Which company are you from?"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      terms: false,
      company: "",
      timeSlot: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/events/registration/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await res.json();
    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.message,
      });
    } else {
      router.push(`/success/`);
      toast({
        variant: "default",
        title: "Success",
        description: response.message,
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>You full name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g James Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g xyz@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-1">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How can we contact you?</FormLabel>
                <FormControl>
                  <Input placeholder="+254 712 345 678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which time slot works for you?</FormLabel>
                <FormControl>
                  <Combobox options={timeSlots} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of your organization</FormLabel>
                <FormControl>
                  <Input placeholder="Organization Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Terms and conditions</FormLabel>
                <FormDescription>
                  I agree to the
                  <Link
                    href="/terms"
                    className="font-semibold text-pes-blue hover:text-pes-red"
                  >
                    {" "}
                    &nbsp;Terms &nbsp;
                  </Link>
                  and
                  <Link
                    href="/privacy"
                    className="font-semibold text-pes-blue hover:text-pes-red"
                  >
                    &nbsp;Privacy Policy.
                  </Link>
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          className="bg-pes-blue font-semibold text-primary text-white hover:bg-pes-red"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Registration;
