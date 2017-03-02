class ApplicationRecord < ActiveRecord::Base
  include BaseModel
  self.abstract_class = true
end
