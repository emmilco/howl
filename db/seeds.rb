# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



def bio
  "#{Faker::Pokemon.move} #{Faker::Job.position} at #{Faker::Company.name}"
end

User.destroy_all
20.times do
  User.create(
    full_name: Faker::Name.name,
    bio: bio,
    email: Faker::Internet.email,
    password: "password"
  )
end

demo_user = User.create({
  full_name: "Demo User",
  email: "demo@us.er",
  password: "password",
  bio: "I'm here to explore..."
  })

User.all.each { |user| demo_user.subscriptions << user }

Article.destroy_all
20.times do
  Article.create(
    title: "#{Faker::Pokemon.name} in #{Faker::Pokemon.location}",
    author: demo_user,
    publish_date: Faker::Date.between(2.years.ago, Date.today),
    published: true
  )
end


Chunk.destroy_all
30.times do |n|
  8.times do |m|
    Chunk.create(
      ord: rand(10000),
      content: BetterLorem.p(1, true),
      content_type: "p",
      article: Article.all.sample
    )
  end

  Chunk.create(
    ord: rand(10000),
    content_type: "quote",
    content: Faker::Dune.quote,
    article: Article.all.sample
  )

  Chunk.create(
    ord: rand(10000),
    content_type: "h1",
    content: Faker::Company.catch_phrase,
    article: Article.all.sample
  )

  Chunk.create(
    ord: rand(10000),
    content_type: "h2",
    content: Faker::Company.catch_phrase,
    article: Article.all.sample
  )

  3.times do |m|
    Chunk.create(
      ord: rand(10000),
      content_type: "img",
      image: File.open(File.join(Rails.root, 'app', 'assets', 'images', 'seed_images', "#{rand(90)+91}.jpg")),
      article: Article.all.sample
    )
  end

end

loomings = Article.create(
  title: "Loomings",
  author_id: User.last.id,
  publish_date: Faker::Date.between(2.years.ago, Date.today),
  published: true
)
