import { ogImage } from '@/lib/og'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  return ogImage({
    title: site.description,
    description:
      'Typed events, Standard Webhooks signing, and transactional publish on PostgreSQL.',
  })
}
