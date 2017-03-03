FactoryGirl.define do
  factory :user do
    name "MyString"
    email "MyString"
    encrypted_password "MyString"
    address "MyString"
    image "MyString"
    phone "MyString"
    reset_password_token "MyString"
    reset_password_sent_at ""
    remember_created_at ""
    plan nil
  end
end
