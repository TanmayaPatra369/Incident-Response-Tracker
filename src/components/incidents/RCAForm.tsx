
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RootCauseAnalysis } from "@/types/incident";

const formSchema = z.object({
  cause: z
    .string()
    .min(10, { message: "Root cause must be at least 10 characters" }),
  impact: z
    .string()
    .min(10, { message: "Impact must be at least 10 characters" }),
  resolution: z
    .string()
    .min(10, { message: "Resolution must be at least 10 characters" }),
  preventiveMeasures: z
    .string()
    .min(10, { message: "Preventive measures must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface RCAFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<RootCauseAnalysis>;
  isSubmitting?: boolean;
}

const RCAForm = ({
  onSubmit,
  defaultValues,
  isSubmitting = false,
}: RCAFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cause: defaultValues?.cause || "",
      impact: defaultValues?.impact || "",
      resolution: defaultValues?.resolution || "",
      preventiveMeasures: defaultValues?.preventiveMeasures || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cause"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Root Cause</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the root cause of the incident"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detail what directly led to this incident
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impact</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the impact of the incident"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detail how this incident affected users, systems, or business operations
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resolution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resolution</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe how the incident was resolved"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detail the steps taken to resolve this incident
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preventiveMeasures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preventive Measures</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe preventive measures for future incidents"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detail what will be done to prevent similar incidents in the future
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit RCA"}
        </Button>
      </form>
    </Form>
  );
};

export default RCAForm;
