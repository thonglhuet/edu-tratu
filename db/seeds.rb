User.create! email: "admin@gmail.com", encrypted_password: "123456",
  name: "Hoang Duc Trung", role: 0
Category.create name: "Accountancy", description: "This is Accountancy"
Category.create name: "Advertising", description: "This is Advertising"
Category.create name: "Banking", description: "This is Banking"
Category.create name: "Computing", description: "This is Computing"
Category.create name: "Engineering", description: "This is Engineering"
Category.create name: "Farming", description: "This is Farming"
Category.create name: "Sales", description: "This is Sales"
Category.create name: "Television", description: "This is Television"
Category.create name: "Human resources", description: "This is Human resources"
Category.create name: "Teaching", description: "This is Teaching"

categories = Category.all

users = User.all
user  = users.first

categories.each do |category|
  name = Faker::Name.title
  description = Faker::Lorem.paragraph
  dictionary = category.dictionaries.build name: name, description: description,
    user_id: user.id
  dictionary.save!

    40.times do
      word = dictionary.words.build content: Faker::Lorem.word, meaning: Faker::Lorem.word
      word.word_details.build kind: "Danh tu", meaning: Faker::Lorem.paragraph
      word.save!
    end
end
