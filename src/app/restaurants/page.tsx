'use client'

import { Suspense } from 'react'

import { Header } from '../_components/header'
import { Restaurants } from './_components/restaurants'

export default function RestaurantsPage() {
  return (
    <>
      <Header />

      <Suspense>
        <Restaurants />
      </Suspense>
    </>
  )
}
