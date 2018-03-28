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
10.times do
  User.create(
    full_name: Faker::Name.name,
    bio: bio,
    email: Faker::Internet.email,
    password: "password",
    avatar: File.open(File.join(Rails.root, 'app', 'assets', 'images', 'seed_images', "#{rand(166) + 1}.jpg"))
  )
end

demo_user = User.create({
  full_name: "Demo User",
  email: "demo@us.er",
  password: "password",
  bio: "I'm here to explore...",
  avatar: File.open(File.join(Rails.root, 'app', 'assets', 'images', 'seed_images', "0.jpg"))
  })

users = User.all
300.times do
  users.sample.subscribers << users.sample
end

Article.destroy_all
70.times do
  Article.create(
    title: "#{Faker::Pokemon.name} in #{Faker::Pokemon.location}",
    author: User.all.sample,
    publish_date: Faker::Date.between(2.years.ago, Date.today),
    published: true
  )
end


Chunk.destroy_all
600.times do |para|
  Chunk.create(
    ord: rand(100000),
    content: File.readlines(File.join(Rails.root, 'db', 'moby_dick.txt')).sample,
    content_type: "p",
    article: Article.all.sample
  )
end

100.times do
  Chunk.create(
    ord: rand(100000),
    content_type: "quote",
    content: File.readlines(File.join(Rails.root, 'db', 'moby_dick.txt')).sample,
    article: Article.all.sample
  )
end

50.times do
  Chunk.create(
    ord: rand(100000),
    content_type: "h1",
    content: Faker::Company.catch_phrase,
    article: Article.all.sample
  )
end

25.times do
  Chunk.create(
    ord: rand(100000),
    content_type: "divider",
    article: Article.all.sample
  )
end

100.times do
  Chunk.create(
    ord: rand(100000),
    content_type: "h2",
    content: Faker::Company.catch_phrase,
    article: Article.all.sample
  )
end

140.times do |m|
  Chunk.create(
    ord: rand(100000),
    content_type: "img",
    image: File.open(File.join(Rails.root, 'app', 'assets', 'images', 'seed_images', "#{rand(166) + 1}.jpg")),
    article: Article.all.sample
  )
end

500.times do
  Comment.create(
    article: Article.all.sample,
    content: File.readlines(File.join(Rails.root, 'db', 'moby_dick.txt')).sample,
    author: User.all.sample
  )
end

500.times do
  Comment.all.sample.likers << User.all.sample
end

500.times do
  Article.all.sample.likers << User.all.sample
end
