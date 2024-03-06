import { Button, FormInput } from 'components/common'
import { Autocomplete } from 'components/features'
import { Hero } from 'components/layout'
import MOCK_CITIES from 'mock/cities'
import { ReactNode, useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { addCitizen } from 'services/blockchain'
import useMainStore from 'store/main'

import type { AddCitizenForm } from 'services/blockchain/citizensService'
import type { Signer } from 'ethers'

export default function AddCitizen() {
  const { signer, mutate } = useMainStore()
  const { register, handleSubmit, setValue } = useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addCitizenReq = useCallback(
    async (data: AddCitizenForm) => {
      if (!data || isLoading) return

      setIsLoading(true)

      try {
        await addCitizen({ ...data, signer: signer as Signer })

        mutate('dialog', {
          title: 'Success',
          message: `Citizen ${data.name} added successfully`,
          type: 'success'
        })
      } catch (error) {
        mutate('dialog', {
          title: 'Error',
          message: `Error adding citizen: ${error}`,
          type: 'error'
        })

        throw new Error(`Error adding citizen: ${error}`)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, mutate, signer]
  )

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      await addCitizenReq(data as AddCitizenForm)
    },
    [addCitizenReq]
  )

  return (
    <div>
      <Hero>Add Citizen</Hero>

      <section className="container-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card mx-auto flex w-96 flex-col gap-4 bg-transparent px-4 py-8 shadow-xl"
        >
          <div>
            <FormInput
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              label="Citizen name"
              disabled={isLoading}
              register={register('name', {
                required: true,
                maxLength: 50
              })}
            />
          </div>

          <div>
            <FormInput
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              label="Citizen Age"
              disabled={isLoading}
              register={register('age', {
                required: true,
                min: 18,
                max: 100
              })}
            />
          </div>

          <div>
            <Autocomplete
              placeholder="Citizen City"
              suggestions={MOCK_CITIES}
              renderSuggestion={(suggestion: unknown) => (
                <div>{suggestion as ReactNode}</div>
              )}
              disabled={isLoading}
              register={register('city', { required: true })}
              onSelect={(suggestion: unknown) => setValue('city', suggestion)}
            />
          </div>

          <div>
            <FormInput
              type="text"
              id="someNote"
              name="someNote"
              placeholder="Note"
              label="Citizen Note"
              disabled={isLoading}
              register={register('someNote', {
                required: true,
                maxLength: 255
              })}
            />
          </div>

          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding citizen...' : 'Add Citizen'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
