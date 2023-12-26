'use client'

import React, { ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
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
import { zodResolver } from '@hookform/resolvers/zod';
import { userValidation } from '@/lib/validations/user';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';

interface Props {
    user : {
        id: string,
        name: string,
        username : string, 
        objectId : string, 
        bio : string, 
        image : string, 
    }; 

    btnTitle : string
}

const AccountProfile = ({ user, btnTitle} : Props) => {
    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || '', 
            name: user?.name || '', 
            username: user?.username || '', 
            bio: user?.bio || '',
        }
    })

    const handleImage = (e : ChangeEvent, fieldChange : (value : string) => void) => {
        e.preventDefault(); 
        
    }
    
    const onSubmit = (values : z.infer<typeof userValidation>) => {
        console.log(values)
    }
    
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col justify-start gap-1">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 pb-5'>
              <FormLabel className='account-form_image-label'>
                {
                    field.value ? (
                        <Image 
                            src = {field.value}
                            alt = "profile photo"
                            width={96}
                            height={96}
                            priority
                            className='rounded-full object-contain'
                        />
                    ) : (
                        <Image 
                            src = 'assets/profile.svg'
                            alt = "profile photo"
                            width={25}
                            height={25}
                            className='object-contain'
                        />
                    )
                }
              </FormLabel>
              <FormControl className='flex-1 text-base text-gray-200' >
                <Input type='file' accept='image/*' placeholder='upload a photo' 
                    className='account-form_image-input'
                    onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap pb-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl>
                <Input 
                  type='text' 
                  className='account-form_input no-focus'
                    {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col gap  w-full pb-3'>
              <FormLabel className='text-base-semibold text-light-2 '>
                Username
              </FormLabel>
              <FormControl >
                <Input 
                  type='text' 
                  className='account-form_input no-focus'
                    {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col gap w-full pb-5'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea 
                  rows = {10}
                  className='account-form_input no-focus'
                    {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-primary-500'>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile