import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <div className="min-h-screen radiant-bg">
      {/* Fixed Audio Player */}
      <AudioPlayer src="/theme.mp3" title="Rooted & Radiant Theme" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/logo.png"
                alt="Rooted & Radiant with Lydia McCuen"
                width={400}
                height={200}
                className="max-w-full h-auto"
                priority
              />
            </div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 px-4 py-2 text-sm font-semibold text-amber-900">
              <span>🌿</span>
              <span>New Episodes Weekly</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Rooted & Radiant
            </h1>
            <p className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl">
              with Lydia McCuen
            </p>
            <p className="mt-6 text-xl leading-8 text-gray-600 sm:text-2xl">
              Where faith meets everyday life.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              A Christian podcast created to help women grow in faith, find peace in the present, 
              and shine with confidence in who God made them to be.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#listen"
                className="rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
              >
                Listen Now
              </a>
              <a
                href="#about"
                className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
              Welcome to Rooted & Radiant
            </h2>
            <div className="space-y-6 text-lg leading-8 text-gray-600">
              <p>
                <strong className="text-gray-900">Rooted & Radiant</strong> is a Christian podcast 
                hosted by <strong className="text-gray-900">Lydia McCuen</strong>, created to help 
                women grow in faith, find peace in the present, and shine with confidence in who God 
                made them to be.
              </p>
              <p>
                Each episode explores how to stay rooted in biblical truth while becoming radiant 
                through grace — learning to walk with Jesus in the middle of real-life struggles, 
                transformation, and renewal.
              </p>
              <p>
                Lydia shares personal stories, scripture-based encouragement, and practical 
                conversations about topics like <strong className="text-gray-900">identity, balance, 
                motherhood, healing, purpose, and spiritual growth</strong>. It's a space for honest 
                reflection, gentle guidance, and powerful reminders that you don't have to be perfect 
                to live a life that shines.
              </p>
              <p className="text-xl font-semibold text-gray-900 italic mt-8">
                So grab your coffee, take a breath, and join Lydia as she helps you grow deeper roots 
                in faith and a brighter light in spirit — one episode at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="bg-emerald-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-600">What We Explore</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Topics That Matter
            </p>
          </div>
          <div className="mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-white text-xl">🌱</span>
                  </div>
                  Identity in Christ
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Discover who you are in God's eyes and embrace your true identity as a beloved 
                    child of Christ.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-white text-xl">✨</span>
                  </div>
                  Spiritual Growth
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Practical guidance for deepening your faith and growing in your walk with Jesus 
                    through everyday moments.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-white text-xl">💚</span>
                  </div>
                  Purpose & Healing
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Find your God-given purpose and experience healing through grace, scripture, 
                    and honest community.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-white text-xl">⚖️</span>
                  </div>
                  Finding Balance
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Learn to balance the demands of life while staying grounded in faith and 
                    radiating God's love.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-white text-xl">👶</span>
                  </div>
                  Motherhood & Faith
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Encouragement for mothers navigating the beautiful, challenging journey of 
                    raising children with faith.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-white text-xl">📖</span>
                  </div>
                  Scripture-Based
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Each episode is rooted in biblical truth, offering real-world application 
                    of God's Word for your daily life.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Listen Section */}
      <section id="listen" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-6">
                Listen Wherever You Get Your Podcasts
              </h3>
              <p className="mb-8 text-lg leading-8 text-gray-600">
                New episodes every week. Subscribe so you never miss an episode of faith, 
                encouragement, and real-life conversations.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className="rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                Apple Podcasts
              </a>
              <a
                href="#"
                className="rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                Spotify
              </a>
              <a
                href="#"
                className="rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                Google Podcasts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Community
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Connect with us on social media for daily encouragement, episode updates, and 
              a community of women growing in faith together.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="mailto:info@rootedandradiant.com"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-lg font-semibold text-gray-900">🌿 Rooted & Radiant</p>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                with Lydia McCuen
              </p>
            </div>
            <p className="text-sm leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Rooted & Radiant. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.955.072-4.358.2-6.78 2.172-6.98 6.537-.056 1.289-.071 1.678-.071 4.936 0 3.258.015 3.646.072 4.936.2 4.358 2.618 6.537 6.979 6.737 1.289.057 1.678.072 4.936.072 3.259 0 3.668-.015 4.936-.072 4.354-.2 6.782-2.196 6.979-6.437.057-1.289.072-1.678.072-4.936 0-3.259-.015-3.647-.072-4.937-.196-4.354-2.617-6.537-6.979-6.737C15.645.014 15.256 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 replication.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0现在是-1.441.645-1.441 1.44 premiums.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
