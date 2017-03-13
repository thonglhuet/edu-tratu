class Api::WordsController < ApplicationController
  before_action :load_dictionary, only: :index
  def index
    render json: @dictionary.words
  end

  private

  def load_dictionary
    @dictionary ||= Dictionary.friendly.find_by(id: params[:dictionary_id]) ||
      NullDictionary.new
  end
end
