require "exir"

class WordImportsController < ApplicationController
  def create
    file_name = params["file"].tempfile.path
    Exir::Excelx.import file_name, dictionary_id: params["dictionary_id"]
  end
end
