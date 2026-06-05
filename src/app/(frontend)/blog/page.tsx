import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export default async function BlogPage() {
  const payload = await getPayload({
    config,
  })

  const blogs = await payload.find({
    collection: 'blogs',
     depth: 1,
  })
console.log(blogs.docs[0])
  return (
    <div>

   {blogs.docs.map((blog) => (
  <div key={blog.id}>

  {blog.featuredImage &&
 typeof blog.featuredImage === 'object' &&
 'url' in blog.featuredImage && (
  <img
    src={blog.featuredImage.url || ''}
    alt={blog.title}
    width={300}
  />
)}

    <h2>
  <Link href={`/blog/${blog.slug}`}>
    {blog.title}
  </Link>
</h2>
{
  blog.category &&
  typeof blog.category === 'object' &&
  'title' in blog.category && (
    <p>{blog.category.title}</p>
  )
}
    <p>{blog.excerpt}</p>

  </div>
))}
    </div>
  )
}