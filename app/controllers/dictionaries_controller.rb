class DictionariesController < ApplicationController
  before_action :authenticate_user!
  before_action :load_dictionary, only: [:show, :edit, :update, :destroy]

  def index
    @dictionaries = current_user.dictionaries.order_by("name")
    @categories = current_user.categories
    @dictionaries = @dictionaries.as_json only: [:id, :name, :description],
      include: {category: {only: [:id, :name]}}
    @categories = @categories.as_json
  end

  def show
  end

  def new
    @dictionary = Dictionary.new
  end

  def edit
  end

  def create
    @dictionary = Dictionary.new dictionary_params
    @dictionary.user_id = current_user.id
    if @dictionary.save
      render json: current_user.dictionaries.order_by("name")
    else
      render json: @dictionary.errors, status: :unprocessable_entity
    end
  end

  def update
    if @dictionary.update dictionary_params
      render json: current_user.dictionaries.order_by("name")
    else
      render json: @dictionary.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @dictionary.destroy
      render json: current_user.dictionaries.order_by("name")
    else
      render json: @dictionary.errors, status: :unprocessable_entity
    end
  end

  private

  def load_dictionary
    @dictionary = Dictionary.find params[:id]
    render_404 unless @dictionary
  end

  def dictionary_params
    params.require(:dictionary).permit Dictionary::ATTR_PARAMS
  end
end
