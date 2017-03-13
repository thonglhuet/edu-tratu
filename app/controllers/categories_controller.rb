class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :load_category, only: [:update, :destroy]
  before_action :update_category_params, only: :create

  def index
    @categories = current_user.categories.as_json
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new cate_params
    @category.user_id = current_user.id
    if @category.save
      if category_params[:dictionaries_attributes]
        render json: current_user.dictionaries
      else
        render json: current_user.categories
      end
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @category.update category_params
      render json: current_user.categories
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @category.destroy
      render json: current_user.categories
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private

  def load_category
    @category = Category.find params[:id]
    render_404 unless @category
  end

  def category_params
    params.require(:category).permit Category::ATTR_PARAMS,
      dictionaries_attributes: [:name, :description]
  end

  def update_category_params
    @cate_params = category_params
    @cate_params[:dictionaries_attributes]["0"][:user_id] = current_user.id if
      category_params[:dictionaries_attributes]
  end
end
