import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const payload = await getPayload({
    config,
  })

  const blogs = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const blog = blogs.docs[0]

  if (!blog) {
    return notFound()
  }

  const formattedDate = new Date(
    blog.publishedDate,
  ).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Featured Image */}
        {blog.featuredImage &&
          typeof blog.featuredImage === 'object' &&
          'url' in blog.featuredImage && (
            <img
              src={blog.featuredImage.url || ''}
              alt={blog.title}
              className="w-full h-[500px] object-cover rounded-2xl mb-10"
            />
          )}

        {/* Excerpt */}
        <p className="text-xl text-gray-300 mb-8">
          {blog.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-gray-400 border-b border-gray-800 pb-6 mb-10">
          <span>
            <strong>Author:</strong> {blog.author}
          </span>

          <span>
            <strong>Date:</strong> {formattedDate}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <RichText data={blog.content} />
        </div>
      </div>
    </main>
  )
}