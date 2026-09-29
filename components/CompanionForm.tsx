"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"  
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects, voices } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companions.actions"
import { redirect } from "next/navigation"


const formSchema = z.object({
  name: z.string().min(2, {message: 'Companion is required.'}),
  subject: z.string().min(2, {message: 'Subject is required.'}),
  topic: z.string().min(2, {message: 'Topic is required.'}),
  voice: z.string().min(2, {message: 'Voice is required.'}),
  style: z.string().min(2, {message: 'Style is required.'}),
  duration: z.coerce.number().min(2, {message: 'Duration is required.'}),

})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values)

        if(companion){
          redirect(`/companions/${companion.id}`)
        }else{
          console.log('Failed to create a companion')
          redirect('/')
        }
    }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Companion name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter companion name"
                    autoComplete="off"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Subject
                  </FieldLabel>
                    <Select onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value} >
                      <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                            {subjects.map((subject) => (
                              <SelectItem value={subject} key={subject} className='capitalize'>
                                {subject}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    What should the companion help with?
                  </FieldLabel>
                  <Textarea 
                    placeholder="Ex. Derivatives and Integrals" 
                    {...field}
                    className="input" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Voice
                  </FieldLabel>
                    <Select onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value} >
                      <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                              <SelectItem value='male'>
                                Male
                              </SelectItem>
                              <SelectItem value='female'>
                                Female
                              </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Style
                  </FieldLabel>
                    <Select onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value} >
                      <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                              <SelectItem value='formal'>
                                Formal
                              </SelectItem>
                              <SelectItem value='casual'>
                                Casual
                              </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Estimated session duration in minutes
                  </FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="15"
                    autoComplete="off"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" className='w-full cursor-pointer'>Build Your Companion</Button>
          </FieldGroup>
        </form>
  )
}

export default CompanionForm