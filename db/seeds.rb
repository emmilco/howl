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
User.create({full_name: "Demo User", email: "demo@us.er", password: "password"})

Article.destroy_all
100.times do
  user = User.all.sample
  Article.create(
    title: "#{Faker::Pokemon.name} in #{Faker::Pokemon.location}",
    author_id: user.id,
    publish_date: Faker::Date.between(2.years.ago, Date.today)
  )
end


Chunk.destroy_all
800.times do
  article = Article.all.sample
  Chunk.create(
    chunkable_id: article.id,
    content: BetterLorem.p(1, true),
    ord: rand(1000000),
    content_type: 'p'
  )
end
