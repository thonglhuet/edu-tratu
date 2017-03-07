class DictionariesController < ApplicationController
  def new
    @dictionary = Dictionary.new
    @categories = Category.all
  end

  def create
    @dictionary = Dictionary.new dictionary_params
    @dictionary.user_id = 1
    if @dictionary.save
      render json: @dictionary
    else
      render json: @dictionary.errors, status: :unprocessable_entity
    end
  end

  private

  def dictionary_params
    params.require(:dictionary).permit :category_id, :name, :description
  end
end
