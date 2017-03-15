module ApplicationHelper
  def load_categories
    @categories = Category.select :id, :name
  end

  def full_title page_title = ""
    base_title = t "title"
    page_title.empty? ? base_title : page_title + " | " + base_title
  end
end
