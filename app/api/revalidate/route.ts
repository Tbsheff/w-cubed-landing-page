import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body)
  const digest = hmac.digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
  } catch {
    return false
  }
}

const TYPE_TO_PATHS: Record<string, (slug?: string) => string[]> = {
  post: (slug) => ['/blog', ...(slug ? [`/blog/${slug}`] : [])],
  project: (slug) => ['/projects', ...(slug ? [`/projects/${slug}`] : [])],
  manufacturer: (slug) => ['/', '/manufacturers', ...(slug ? [`/manufacturers/${slug}`] : [])],
  siteSettings: () => ['/'],
  representative: () => ['/', '/territory', '/contact'],
  territoryInfo: () => ['/territory', '/contact'],
  author: () => ['/blog'],
  category: () => ['/blog', '/projects', '/manufacturers'],
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.REVALIDATE_SECRET
    if (!secret) {
      return NextResponse.json({ ok: false, error: 'Server misconfigured' }, { status: 500 })
    }

    const body = await req.text()
    const signature = req.headers.get('x-sanity-signature') || ''

    if (!verifySignature(body, signature, secret)) {
      return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const type = payload._type as string
    const slug = payload.slug?.current as string | undefined

    const pathsFn = TYPE_TO_PATHS[type]
    if (!pathsFn) {
      return NextResponse.json({ ok: true, message: `Unknown type: ${type}, no paths revalidated` })
    }

    const paths = pathsFn(slug)
    paths.forEach((p) => revalidatePath(p))

    return NextResponse.json({ ok: true, revalidated: paths })
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
