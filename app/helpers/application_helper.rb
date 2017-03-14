module ApplicationHelper
  def load_categories
    @categories = Category.select :id, :name
  end

  def full_title page_title = ""
    base_title = t "title"
    page_title.empty? ? base_title : page_title + " | " + base_title
  end

  def increase_index index
    @page = params[:page].nil? ? 0 : params[:page].to_i
    @page * Settings.organizations.per_page + index + 1
  end
end
