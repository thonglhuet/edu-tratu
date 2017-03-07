module ApplicationHelper
  def load_categories
    @categories = Category.select :id, :name
  end
end
