namespace :db do
  desc "remake database data"
  task remake_data: :environment do
       Rake::Task["db:migrate:reset"].invoke
       puts "Creating user Manager"
       user = User.create! email: "admin@gmail.com", encrypted_password: "123456",
         name: "Hoang Duc Trung", role: 0
       puts "Creating categories"
       categories_hash = {
        "Accountancy": "This is Accountancy",
        "Advertising": "This is Advertising",
        "Banking": "This is Banking",
        "Computing": "This is Computing",
        "Engineering": "This is Engineering",
        "Farming": "This is Farming",
        "Sales": "This is Sales",
        "Television": "This is Television",
        "Human resources": "This is Human resources",
        "Teaching": "This is Teaching",
       }
       categories_hash.each do |name,description|
        category = Category.create! name: name, description: description
       end
       puts "Creating dictionary and word and word_details"
       categories = Category.all
       users = User.all
       user  = users.first

       categories.each do |category|
         name = Faker::Name.title
         description = Faker::Lorem.paragraph
         dictionary =  Dictionary.create! name: name, description: description,
           user_id: user.id, category_id: category.id
           40.times do
              word =dictionary.words.build content: Faker::Lorem.word, meaning: Faker::Lorem.word
              word.word_details.build kind: "Danh tu", meaning: Faker::Lorem.paragraph
              word.word_details.build kind: "Dong tu", meaning: Faker::Lorem.paragraph
              word.save!
           end
       end
      puts "Success remake data"
  end

end
