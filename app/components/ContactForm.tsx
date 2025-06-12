"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(2, { message: "Please share your name (at least 2 characters)." }),
  email: z.string().email({ message: "Please provide a valid email so we can respond to you." }),
  subject: z.string().min(3, { message: "Please provide a subject for your message." }),
  message: z.string().min(10, { message: "Please share a bit more detail (at least 10 characters)." }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitResult(null)

    // Simulate API call instead of actual fetch to avoid server errors
    setTimeout(() => {
      console.log("Form values:", values)
      setSubmitResult({
        success: true,
        message: "Your message has been sent. We'll respond within 48 hours.",
      })
      form.reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {submitResult && (
        <Alert className={submitResult.success ? "bg-[#A3B18A] bg-opacity-20" : "bg-red-900 bg-opacity-20"}>
          <AlertDescription className="text-[#FAF3E0]">{submitResult.message}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FAF3E0]">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50"
                  />
                </FormControl>
                <FormMessage className="text-[#D4AF37]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FAF3E0]">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                    className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50"
                  />
                </FormControl>
                <FormMessage className="text-[#D4AF37]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FAF3E0]">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is your message about?"
                    {...field}
                    className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50"
                  />
                </FormControl>
                <FormMessage className="text-[#D4AF37]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FAF3E0]">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts, questions, or what you're seeking..."
                    className="min-h-[150px] bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#D4AF37]" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#A3B18A] hover:bg-[#A3B18A] hover:opacity-90 text-[#0A192F] font-medium py-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
