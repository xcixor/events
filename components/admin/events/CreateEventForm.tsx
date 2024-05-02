"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { boolean, z } from "zod";
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
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type FormProps = {
  title: string;
  description: string;
  isActive: boolean;
  url: string;
  method: string;
};

const CreateEventForm = ({
  title,
  description,
  isActive,
  url,
  method,
}: FormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    title: z.string().min(2, "Please provide the event title"),
    description: z.string().min(2, "Please provide a summary"),
    isActive: z.boolean().refine((val) => val, {
      message: "Do you want to publish this event?",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      isActive: isActive,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(url, {
        method: method,
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
        const { id } = response;
        router.push(`/dashboard/profile/admin/events/${id}/`);
        toast({
          variant: "default",
          title: "Success",
          description: response.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g cybersecurity training" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g summary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish status</FormLabel>
                <FormDescription>
                  If checked, this event will be available to the public.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" className="hover:bg-secondary">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventForm;
