class Todo < ActiveRecord::Base
  attr_accessible :done, :project, :title
end
