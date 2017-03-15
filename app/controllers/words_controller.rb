class WordsController < ApplicationController
  before_action :authenticate_user!

  def new
    @dictionaries = current_user.dictionaries
  end

  def create
    @word = Word.new word_params
    if @word.save
      render json: {head: :ok}
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  private

  def word_params
    params.require(:word).permit Word::ATTR_PARAMS
  end
end
