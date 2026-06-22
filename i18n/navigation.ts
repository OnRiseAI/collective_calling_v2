import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// All later tasks import these locale-aware helpers from "@/i18n/navigation".
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
